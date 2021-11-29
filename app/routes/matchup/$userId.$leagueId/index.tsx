export default function Index() {
  return (
    <main>
      <form method="post" className="flex flex-col text-left">
        <label htmlFor="username2">
          <span>Enter the 2nd sleeper user id</span>
          <br />
          <input
            type="text"
            name="username2"
            id="username2"
          />
        </label>
        <button type="submit">Ok</button>
      </form>
    </main>
  );
}
