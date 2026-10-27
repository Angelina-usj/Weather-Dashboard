export default function ErrorMessage({ city }) {
  return (
    <p className="error-box">
      Couldn't load weather for "{city}". Check the spelling and try again.
    </p>
  );
}
