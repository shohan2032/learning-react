import useCounter from '../context/CounterContext';

export default function ComponentB() {
  const { dispatch } = useCounter();

  return (
    <div>
      <p>Component B</p>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>
        Increment
      </button>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>
        Decrement
      </button>
    </div>
  );
}
