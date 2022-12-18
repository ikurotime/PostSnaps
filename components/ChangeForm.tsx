type Props = {
  loading: boolean;
  handleSubmit: (event: Event) => void;
  handleChange: (event: Event) => void;
};
export const ChangeForm = ({ handleSubmit, handleChange, loading }: Props) => {
  return (
    <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          New password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onInput={handleChange}
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          for="password_confirm"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm new password
        </label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
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
        Change Password
      </button>
    </form>
  );
};
