# Complete Guide to TanStack Query

## What is TanStack Query?

TanStack Query is a powerful data synchronization library for React applications. Think of it as a smart manager for your API calls that handles:

- **Fetching data** from servers
- **Caching** responses to avoid unnecessary requests
- **Updating UI** when data changes
- **Managing loading states** automatically
- **Handling errors** gracefully
- **Synchronizing data** across components

## Why Use TanStack Query?

### Without TanStack Query (Traditional Approach):

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetch("/api/data")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
}, []);

// Problems:
// - Repetitive boilerplate code
// - No caching (refetches every time)
// - Manual loading/error state management
// - No background updates
// - Hard to share data between components
```

### With TanStack Query:

```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ["data"],
  queryFn: () => fetch("/api/data").then((res) => res.json()),
});

// Benefits:
// - Automatic caching
// - Background refetching
// - Loading states handled automatically
// - Easy data sharing between components
// - Optimistic updates
```

## Core Concepts

### 1. Query Keys

Query keys uniquely identify queries and are used for caching.

```javascript
// Simple key
queryKey: ["todos"];

// Key with parameters
queryKey: ["todos", { status: "completed" }];

// Hierarchical keys (recommended)
queryKey: ["fonts", "google"]; // All Google fonts
queryKey: ["fonts", "site", siteId]; // Fonts for specific site
```

### 2. Query Functions

Functions that actually fetch the data.

```javascript
queryFn: async () => {
  const response = await fetch("/api/fonts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
```

### 3. Mutations

For creating, updating, or deleting data (POST, PUT, DELETE requests).

```javascript
const mutation = useMutation({
  mutationFn: (newFont) => {
    return fetch("/api/fonts", {
      method: "POST",
      body: JSON.stringify(newFont),
    });
  },
});
```

## Main Hooks

### useQuery - For Fetching Data

```javascript
const {
  data, // The actual data
  isLoading, // Initial loading state
  isFetching, // Any fetching state (including background)
  error, // Error object if request failed
  refetch, // Function to manually refetch
  isSuccess, // True when query succeeded
  isError, // True when query failed
} = useQuery({
  queryKey: ["key"],
  queryFn: fetchFunction,
  staleTime: 5000, // Data fresh for 5 seconds
  gcTime: 300000, // Keep in cache for 5 minutes
  enabled: true, // Whether to run the query
  retry: 3, // Retry failed requests 3 times
});
```

### useMutation - For Modifying Data

```javascript
const {
  mutate, // Function to trigger the mutation
  mutateAsync, // Async version that returns a promise
  isPending, // Loading state
  isError, // Error state
  isSuccess, // Success state
  error, // Error object
  data, // Response data
} = useMutation({
  mutationFn: updateFunction,
  onSuccess: (data, variables) => {
    // Called when mutation succeeds
  },
  onError: (error, variables) => {
    // Called when mutation fails
  },
});
```

### useQueryClient - For Cache Management

```javascript
const queryClient = useQueryClient();

// Invalidate and refetch queries
queryClient.invalidateQueries({ queryKey: ["fonts"] });

// Set query data manually
queryClient.setQueryData(["font", 1], newFontData);

// Get cached data
const cachedData = queryClient.getQueryData(["fonts"]);
```

## How Your Font Management Code Works

### 1. Query Keys Structure

```javascript
export const fontQueryKeys = {
  all: ['fonts'] as const,                    // Base key for all font queries
  googleFonts: () => [...fontQueryKeys.all, 'google'] as const,  // ['fonts', 'google']
  siteFonts: (siteId: number) => [...fontQueryKeys.all, 'site', siteId] as const,  // ['fonts', 'site', 123]
} as const;
```

**Why this structure?**

- Hierarchical organization makes cache invalidation easier
- Can invalidate all fonts with `['fonts']`
- Can target specific font types with `['fonts', 'google']`

### 2. Fetching Google Fonts

```javascript
export const useGoogleFonts = () => {
  return useQuery({
    queryKey: fontQueryKeys.googleFonts(), // ['fonts', 'google']
    queryFn: async (): Promise<GoogleFontsResponse> => {
      const response = await httpClient.get("/fonts/google");
      return response?.data || [];
    },
  });
};
```

**What happens:**

1. Component calls `useGoogleFonts()`
2. TanStack Query checks cache for `['fonts', 'google']`
3. If not cached or stale, makes API call to `/fonts/google`
4. Caches the response
5. Returns data, loading state, and error state

### 3. Creating a Google Font (Mutation)

```javascript
export const useCreateGoogleFont = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fields: FontsCreatePayload): Promise<SiteFont> => {
      // Make API call to create font
      const response = await httpClient.post(`/fonts`, {
        type: "google",
        ...fields,
        siteId,
      });

      if (response && response.data) {
        return {
          ...response.data,
          settings: JSON.parse(response.data.settings),
        };
      }
      throw new Error("Failed to create Google font");
    },
    onSuccess: () => {
      // After successful creation, update the cache
      queryClient.invalidateQueries({
        queryKey: fontQueryKeys.siteFonts(siteId), // Refetch site fonts
      });
      message.success("Font added successfully");
    },
    onError: (error) => {
      console.error("Error creating Google font:", error);
      message.error("Failed to add font");
    },
  });
};
```

**Flow when creating a font:**

1. User submits form → `createGoogleFontMutation.mutateAsync(fields)`
2. API call is made to create the font
3. If successful:
   - `onSuccess` callback runs
   - `queryClient.invalidateQueries()` marks site fonts cache as stale
   - TanStack Query automatically refetches site fonts
   - UI updates with new font in the list
   - Success message shows
4. If failed:
   - `onError` callback runs
   - Error message shows

### 4. Cache Invalidation Strategy

```javascript
// After any mutation, invalidate relevant queries
queryClient.invalidateQueries({
  queryKey: fontQueryKeys.siteFonts(siteId),
});
```

**Why invalidate?**

- When you add/delete/update a font, the list changes
- Instead of manually updating cache, mark it as stale
- TanStack Query automatically refetches fresh data
- Ensures UI always shows current state

## Component Usage Example

```javascript
const GoogleFonts = ({ googleFonts, fontList, setAsGlobal, loading }) => {
  // Get mutation hook
  const createGoogleFontMutation = useCreateGoogleFont();
  const deleteFontMutation = useDeleteFont();

  // Use mutation
  const createGoogleFont = async (fields) => {
    try {
      // This triggers the mutation
      await createGoogleFontMutation.mutateAsync(fields);
      // Reset form after success
      googleForm.resetFields();
      setSelectedFont(null);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <div>
      <Form onFinish={createGoogleFont}>
        {/* Form fields */}
        <Button
          htmlType="submit"
          loading={createGoogleFontMutation.isPending} // Show loading state
          disabled={createGoogleFontMutation.isPending}
        >
          Add
        </Button>
      </Form>
    </div>
  );
};
```

## Key Benefits in Your Code

### 1. Automatic Cache Management

- Google fonts are fetched once and cached
- Site fonts are cached per site
- No duplicate requests

### 2. Optimistic UI Updates

- When you delete a font, UI updates immediately
- If deletion fails, UI reverts automatically

### 3. Loading States

- `isPending` automatically tracks mutation state
- No manual loading state management needed

### 4. Error Handling

- Centralized error handling in hooks
- Consistent error messages across components

### 5. Data Synchronization

- Multiple components can use the same query
- When data changes, all components update automatically

## Data Flow Summary

1. **Page loads** → `useGoogleFonts()` and `useSiteFonts()` fetch data
2. **User adds font** → `createGoogleFontMutation.mutateAsync()` called
3. **API call succeeds** → `onSuccess` invalidates site fonts cache
4. **TanStack Query refetches** site fonts automatically
5. **UI updates** with new font in the list
6. **User sees updated list** without manual refresh

This creates a seamless, reactive experience where the UI stays synchronized with server data automatically.

# TanStack Query Hooks - Complete Documentation

## Table of Contents

1. [useQuery](#usequery)
2. [useMutation](#usemutation)
3. [useQueryClient](#usequeryclient)
4. [useInfiniteQuery](#useinfinitequery)
5. [useQueries](#usequeries)
6. [useSuspenseQuery](#usesuspensequery)

---

## useQuery

**Purpose**: For fetching, caching, and synchronizing server state data.

### When to Use

- ✅ Fetching data from APIs (GET requests)
- ✅ Loading data that can be cached
- ✅ Data that multiple components might need
- ✅ When you want automatic refetching, caching, and error handling

### When NOT to Use

- ❌ Creating, updating, or deleting data (use `useMutation`)
- ❌ One-time operations that shouldn't be cached
- ❌ Client-side only data (use regular `useState`)

### Basic Syntax

```typescript
const result = useQuery(options);
```

### Options (Props)

#### Required Props

| Prop       | Type               | Description                                        |
| ---------- | ------------------ | -------------------------------------------------- |
| `queryKey` | `unknown[]`        | Unique identifier for the query. Used for caching. |
| `queryFn`  | `() => Promise<T>` | Function that returns a promise resolving to data. |

#### Optional Props

| Prop                   | Type                                                    | Default             | Description                                               |
| ---------------------- | ------------------------------------------------------- | ------------------- | --------------------------------------------------------- |
| `enabled`              | `boolean`                                               | `true`              | Whether the query should execute.                         |
| `staleTime`            | `number`                                                | `0`                 | Time in ms before data is considered stale.               |
| `gcTime`               | `number`                                                | `300000`            | Time in ms before inactive queries are garbage collected. |
| `refetchOnMount`       | `boolean \| "always"`                                   | `true`              | Whether to refetch when component mounts.                 |
| `refetchOnWindowFocus` | `boolean \| "always"`                                   | `true`              | Whether to refetch when window regains focus.             |
| `refetchOnReconnect`   | `boolean \| "always"`                                   | `true`              | Whether to refetch when network reconnects.               |
| `retry`                | `boolean \| number \| (failureCount, error) => boolean` | `3`                 | Number of retry attempts or retry logic.                  |
| `retryDelay`           | `number \| (retryAttempt) => number`                    | Exponential backoff | Delay between retries.                                    |
| `select`               | `(data) => any`                                         | `undefined`         | Transform or select part of the data.                     |
| `placeholderData`      | `T \| (previousData) => T`                              | `undefined`         | Data to use while loading.                                |
| `initialData`          | `T \| () => T`                                          | `undefined`         | Initial data (bypasses loading state).                    |

### Return Values

| Property         | Type                                 | Description                                             |
| ---------------- | ------------------------------------ | ------------------------------------------------------- |
| `data`           | `T \| undefined`                     | The actual data returned by queryFn.                    |
| `isLoading`      | `boolean`                            | `true` during initial load (no cached data).            |
| `isFetching`     | `boolean`                            | `true` during any fetch (including background refetch). |
| `isError`        | `boolean`                            | `true` if query encountered an error.                   |
| `isSuccess`      | `boolean`                            | `true` if query executed successfully.                  |
| `isPending`      | `boolean`                            | `true` if query is loading or has no data.              |
| `error`          | `Error \| null`                      | Error object if query failed.                           |
| `refetch`        | `() => Promise<QueryObserverResult>` | Function to manually refetch.                           |
| `dataUpdatedAt`  | `number`                             | Timestamp when data was last updated.                   |
| `errorUpdatedAt` | `number`                             | Timestamp when error was last updated.                  |
| `failureCount`   | `number`                             | Number of consecutive failures.                         |
| `failureReason`  | `Error \| null`                      | Reason for the last failure.                            |
| `fetchStatus`    | `'fetching' \| 'paused' \| 'idle'`   | Current fetch status.                                   |
| `status`         | `'pending' \| 'error' \| 'success'`  | Overall query status.                                   |

### Examples

#### Basic Usage

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    const response = await fetch("/api/users");
    return response.json();
  },
});
```

#### With Parameters

```typescript
const { data } = useQuery({
  queryKey: ["user", userId],
  queryFn: async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  },
  enabled: !!userId, // Only run if userId exists
  staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
});
```

#### Data Transformation

```typescript
const { data: userNames } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  select: (data) => data.map((user) => user.name), // Only return names
});
```

---

## useMutation

**Purpose**: For creating, updating, or deleting data (side effects).

### When to Use

- ✅ POST, PUT, PATCH, DELETE requests
- ✅ Creating new records
- ✅ Updating existing data
- ✅ Deleting data
- ✅ Any operation that changes server state

### When NOT to Use

- ❌ Fetching/reading data (use `useQuery`)
- ❌ Operations that don't change server state

### Basic Syntax

```typescript
const mutation = useMutation(options);
```

### Options (Props)

#### Required Props

| Prop         | Type                        | Description                          |
| ------------ | --------------------------- | ------------------------------------ |
| `mutationFn` | `(variables) => Promise<T>` | Function that performs the mutation. |

#### Optional Props

| Prop          | Type                                                    | Description                                           |
| ------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| `onSuccess`   | `(data, variables, context) => void`                    | Called when mutation succeeds.                        |
| `onError`     | `(error, variables, context) => void`                   | Called when mutation fails.                           |
| `onSettled`   | `(data, error, variables, context) => void`             | Called when mutation settles (success or error).      |
| `onMutate`    | `(variables) => Promise<context> \| context`            | Called before mutation. Good for optimistic updates.  |
| `retry`       | `boolean \| number \| (failureCount, error) => boolean` | Retry logic.                                          |
| `retryDelay`  | `number \| (retryAttempt) => number`                    | Delay between retries.                                |
| `mutationKey` | `unknown[]`                                             | Unique key for the mutation (for advanced use cases). |

### Return Values

| Property        | Type                                          | Description                                   |
| --------------- | --------------------------------------------- | --------------------------------------------- |
| `mutate`        | `(variables, options?) => void`               | Function to trigger mutation.                 |
| `mutateAsync`   | `(variables, options?) => Promise<T>`         | Async version that returns promise.           |
| `isPending`     | `boolean`                                     | `true` while mutation is executing.           |
| `isError`       | `boolean`                                     | `true` if mutation failed.                    |
| `isSuccess`     | `boolean`                                     | `true` if mutation succeeded.                 |
| `isIdle`        | `boolean`                                     | `true` if mutation hasn't been triggered yet. |
| `data`          | `T \| undefined`                              | Data returned by successful mutation.         |
| `error`         | `Error \| null`                               | Error from failed mutation.                   |
| `reset`         | `() => void`                                  | Reset mutation state.                         |
| `context`       | `unknown`                                     | Context returned from `onMutate`.             |
| `failureCount`  | `number`                                      | Number of consecutive failures.               |
| `failureReason` | `Error \| null`                               | Reason for last failure.                      |
| `status`        | `'idle' \| 'pending' \| 'error' \| 'success'` | Current mutation status.                      |
| `submittedAt`   | `number`                                      | Timestamp when mutation was submitted.        |
| `variables`     | `TVariables \| undefined`                     | Variables passed to mutation.                 |

### Examples

#### Basic Usage

```typescript
const createUserMutation = useMutation({
  mutationFn: async (userData) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },
  onSuccess: (data) => {
    console.log("User created:", data);
  },
  onError: (error) => {
    console.error("Failed to create user:", error);
  },
});

// Trigger the mutation
const handleSubmit = (formData) => {
  createUserMutation.mutate(formData);
};
```

#### With Cache Updates

```typescript
const deleteUserMutation = useMutation({
  mutationFn: async (userId) => {
    await fetch(`/api/users/${userId}`, { method: "DELETE" });
    return userId;
  },
  onSuccess: (deletedUserId) => {
    // Update cache after successful deletion
    queryClient.invalidateQueries({ queryKey: ["users"] });

    // Or manually update cache
    queryClient.setQueryData(["users"], (oldData) =>
      oldData.filter((user) => user.id !== deletedUserId)
    );
  },
});
```

#### Optimistic Updates

```typescript
const updateUserMutation = useMutation({
  mutationFn: async ({ id, updates }) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return response.json();
  },
  onMutate: async ({ id, updates }) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ["user", id] });

    // Snapshot previous value
    const previousUser = queryClient.getQueryData(["user", id]);

    // Optimistically update cache
    queryClient.setQueryData(["user", id], (old) => ({ ...old, ...updates }));

    // Return rollback function
    return { previousUser };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    if (context?.previousUser) {
      queryClient.setQueryData(["user", variables.id], context.previousUser);
    }
  },
  onSettled: (data, error, variables) => {
    // Refetch to ensure server state
    queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
  },
});
```

---

## useQueryClient

**Purpose**: Access the QueryClient instance for manual cache manipulation.

### When to Use

- ✅ Invalidating queries
- ✅ Manually updating cache
- ✅ Prefetching data
- ✅ Getting cached data
- ✅ Advanced cache operations

### Basic Syntax

```typescript
const queryClient = useQueryClient();
```

### Methods

#### Cache Invalidation

```typescript
// Invalidate all queries
queryClient.invalidateQueries();

// Invalidate specific queries
queryClient.invalidateQueries({ queryKey: ["users"] });

// Invalidate with predicate
queryClient.invalidateQueries({
  predicate: (query) => query.queryKey[0] === "users",
});
```

#### Manual Cache Updates

```typescript
// Set query data
queryClient.setQueryData(["user", 1], newUserData);

// Update query data
queryClient.setQueryData(["users"], (oldUsers) => [...oldUsers, newUser]);

// Get query data
const users = queryClient.getQueryData(["users"]);
```

#### Prefetching

```typescript
// Prefetch data
await queryClient.prefetchQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
  staleTime: 10 * 1000, // 10 seconds
});

// Prefetch infinite query
await queryClient.prefetchInfiniteQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  initialPageParam: 0,
});
```

#### Cache Utilities

```typescript
// Remove queries from cache
queryClient.removeQueries({ queryKey: ["users"] });

// Cancel ongoing queries
queryClient.cancelQueries({ queryKey: ["users"] });

// Get query state
const queryState = queryClient.getQueryState(["users"]);

// Get query cache
const queryCache = queryClient.getQueryCache();
```

---

## useInfiniteQuery

**Purpose**: For paginated or infinite scroll data fetching.

### When to Use

- ✅ Infinite scroll implementations
- ✅ "Load more" functionality
- ✅ Paginated data where you want to load multiple pages
- ✅ Data that comes in chunks/pages

### Basic Syntax

```typescript
const result = useInfiniteQuery(options);
```

### Key Options

| Prop                   | Type                                            | Description                         |
| ---------------------- | ----------------------------------------------- | ----------------------------------- |
| `queryKey`             | `unknown[]`                                     | Unique identifier for the query.    |
| `queryFn`              | `({ pageParam }) => Promise<T>`                 | Function that fetches a page.       |
| `initialPageParam`     | `unknown`                                       | Parameter for the first page.       |
| `getNextPageParam`     | `(lastPage, allPages) => unknown \| undefined`  | How to get next page parameter.     |
| `getPreviousPageParam` | `(firstPage, allPages) => unknown \| undefined` | How to get previous page parameter. |

### Additional Return Values

| Property                 | Type                                         | Description                      |
| ------------------------ | -------------------------------------------- | -------------------------------- |
| `data.pages`             | `T[]`                                        | Array of all fetched pages.      |
| `data.pageParams`        | `unknown[]`                                  | Parameters for each page.        |
| `fetchNextPage`          | `() => Promise<InfiniteQueryObserverResult>` | Fetch next page.                 |
| `fetchPreviousPage`      | `() => Promise<InfiniteQueryObserverResult>` | Fetch previous page.             |
| `hasNextPage`            | `boolean`                                    | Whether there's a next page.     |
| `hasPreviousPage`        | `boolean`                                    | Whether there's a previous page. |
| `isFetchingNextPage`     | `boolean`                                    | Whether fetching next page.      |
| `isFetchingPreviousPage` | `boolean`                                    | Whether fetching previous page.  |

### Example

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(`/api/posts?page=${pageParam}&limit=10`);
      return response.json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Return undefined if no more pages
      return lastPage.hasMore ? allPages.length : undefined;
    },
  });

// Render pages
const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];
```

---

## useQueries

**Purpose**: Execute multiple queries in parallel.

### When to Use

- ✅ Multiple independent queries at once
- ✅ Dynamic number of queries
- ✅ Queries that depend on array of IDs

### Basic Syntax

```typescript
const results = useQueries({
  queries: [
    { queryKey: ["user", 1], queryFn: () => fetchUser(1) },
    { queryKey: ["user", 2], queryFn: () => fetchUser(2) },
  ],
});
```

### Dynamic Queries Example

```typescript
const userIds = [1, 2, 3, 4];

const userQueries = useQueries({
  queries: userIds.map((id) => ({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  })),
});

// Access results
const users = userQueries.map((query) => query.data).filter(Boolean);
const isAnyLoading = userQueries.some((query) => query.isLoading);
```

---

## useSuspenseQuery

**Purpose**: For use with React Suspense boundaries.

### When to Use

- ✅ With React Suspense
- ✅ When you want to handle loading states at boundary level
- ✅ Server-side rendering with suspense

### Key Differences from useQuery

- Never returns `isLoading: true`
- Throws promise instead of returning loading state
- Data is always defined (never undefined)
- No `isPending`, `isError` states (handled by Suspense/ErrorBoundary)

### Example

```typescript
function UserProfile({ userId }) {
  // This will suspend the component until data loads
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  // user is always defined here
  return <div>{user.name}</div>;
}

// Wrap with Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  );
}
```

---

## Hook Selection Guide

| Use Case             | Hook               | Why                             |
| -------------------- | ------------------ | ------------------------------- |
| Fetch data (GET)     | `useQuery`         | Caching, automatic refetching   |
| Create/Update/Delete | `useMutation`      | Side effects, no caching needed |
| Infinite scroll      | `useInfiniteQuery` | Paginated data handling         |
| Multiple queries     | `useQueries`       | Parallel execution              |
| With Suspense        | `useSuspenseQuery` | Suspense-compatible             |
| Cache manipulation   | `useQueryClient`   | Direct cache access             |

## Common Patterns

### 1. Dependent Queries

```typescript
const { data: user } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId,
});

const { data: posts } = useQuery({
  queryKey: ["posts", user?.id],
  queryFn: () => fetchUserPosts(user.id),
  enabled: !!user?.id, // Only run after user is loaded
});
```

### 2. Mutation with Optimistic Update

```typescript
const updatePostMutation = useMutation({
  mutationFn: updatePost,
  onMutate: async (newPost) => {
    // Cancel refetch
    await queryClient.cancelQueries({ queryKey: ["posts"] });

    // Snapshot
    const previousPosts = queryClient.getQueryData(["posts"]);

    // Optimistic update
    queryClient.setQueryData(["posts"], (old) =>
      old.map((post) => (post.id === newPost.id ? newPost : post))
    );

    return { previousPosts };
  },
  onError: (err, newPost, context) => {
    // Rollback
    queryClient.setQueryData(["posts"], context.previousPosts);
  },
  onSettled: () => {
    // Refetch
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});
```

### 3. Global Loading State

```typescript
const { isFetching } = useIsFetching();
const { isPending } = useIsMutating();

const isGlobalLoading = isFetching > 0 || isPending > 0;
```

**Code Example:**

```ts
import { message } from "antd";
import httpClient from "@/http-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { siteId } from "../constant";
import {
  FontsCreatePayload,
  FontsResponse,
  GoogleFontsResponse,
  SiteFont,
} from "../type";

// Query keys
export const fontQueryKeys = {
  all: ["fonts"] as const,
  googleFonts: () => [...fontQueryKeys.all, "google"] as const,
  siteFonts: (siteId: number) =>
    [...fontQueryKeys.all, "site", siteId] as const,
} as const;

// Hook for fetching Google Fonts
export const useGoogleFonts = () => {
  return useQuery({
    queryKey: fontQueryKeys.googleFonts(),
    queryFn: async (): Promise<GoogleFontsResponse> => {
      const response = await httpClient.get("/fonts/google");
      return response?.data || [];
    },
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching Site Fonts
export const useSiteFonts = () => {
  return useQuery({
    queryKey: fontQueryKeys.siteFonts(siteId),
    queryFn: async (): Promise<FontsResponse> => {
      const response = await httpClient.get(`/fonts/${siteId}`);
      return response?.data;
    },
    // staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for creating a Google font
export const useCreateGoogleFont = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fields: FontsCreatePayload): Promise<SiteFont> => {
      const response = await httpClient.post(`/fonts`, {
        type: "google",
        ...fields,
        siteId,
      });

      if (response && response.data) {
        return {
          ...response.data,
          settings: JSON.parse(response.data.settings),
        };
      }
      throw new Error("Failed to create Google font");
    },
    onSuccess: () => {
      // Invalidate and refetch site fonts
      queryClient.invalidateQueries({
        queryKey: fontQueryKeys.siteFonts(siteId),
      });
      message.success("Font added successfully");
    },
    onError: (error) => {
      console.error("Error creating Google font:", error);
      message.error("Failed to add font");
    },
  });
};

// Hook for creating a custom font
export const useCreateCustomFont = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      fields: FontsCreatePayload;
      file: { file_link: string; file_name: string };
    }): Promise<SiteFont> => {
      const { fields, file } = payload;
      const response = await httpClient.post(`/fonts`, {
        ...fields,
        type: "custom",
        url: file.file_link,
        format: file.file_name.split(".").pop(),
      });

      if (response && response.data) {
        return {
          ...response.data,
          settings: JSON.parse(response.data.settings),
        };
      }
      throw new Error("Failed to create custom font");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: fontQueryKeys.siteFonts(siteId),
      });
      message.success("Font added successfully");
    },
    onError: (error) => {
      console.error("Error adding custom font:", error);
      message.error("Failed to add font");
    },
  });
};

// Hook for deleting a font
export const useDeleteFont = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number; isCustom: boolean }) => {
      return await httpClient.delete(`/fonts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: fontQueryKeys.siteFonts(siteId),
      });
      message.success("Font deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting font:", error);
      message.error("Failed to delete font");
    },
  });
};

// Hook for setting a font as global/default
export const useSetGlobalFont = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      fontId: number;
      previousDefaultFontId: number;
    }) => {
      const response = await httpClient.patch(`/fonts/make-default`, {
        ...payload,
        siteId,
      });

      if (response && response.data === 1) {
        return response.data;
      }
      throw new Error("Failed to set global font");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: fontQueryKeys.siteFonts(siteId),
      });
      message.success("Global Font Updated Successfully");
    },
    onError: (error) => {
      console.error("Error setting global font:", error);
      message.error("Failed to set global font");
    },
  });
};
```
