type Props = {
  loading: boolean;
  handleSubmit: (event: Event) => void;
  handleChange: (event: Event) => void;
};
export const ResetForm = ({ handleSubmit, handleChange, loading }: Props) => {
  return (
    <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onInput={handleChange}
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        type="submit"
        class={`w-full text-white ${
          loading
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-blue-600 hover:bg-blue-700"
        } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}
      >
        Reset
      </button>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Already registered?{" "}
        <a
          href="/login"
          class="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Log in
        </a>
      </p>
    </form>
  );
};
