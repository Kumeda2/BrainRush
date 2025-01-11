export default function strengthIndicator({strengthLevel}) {
  return (
    <div className="password-strength">
      {strengthLevel.map((strengthLevel, idx) => {
        return (
          <div
            className={
              strengthLevel
                ? "strength-level strength-level-reached"
                : "strength-level"
            }
            key={idx}
          />
        );
      })}
      <p>Password strength</p>
    </div>
  );
}
