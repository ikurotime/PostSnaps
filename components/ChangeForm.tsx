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
          class="block mb-2 text-sm font-medium text-white"
        >
          New password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onInput={handleChange}
          class=" border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          for="password_confirm"
          class="block mb-2 text-sm font-medium text-white"
        >
          Confirm new password
        </label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          onInput={handleChange}
          class="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
