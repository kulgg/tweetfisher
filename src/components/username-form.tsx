import React from "react";

export type UsernameFormProps = {
  username: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function UsernameForm({
  username,
  handleChange,
  handleSubmit,
}: UsernameFormProps) {
  return (
    <form onSubmit={handleSubmit} className="relative">
      <label
        htmlFor="search"
        className="block text-lg font-medium text-indigo-200"
      >
        Enter a username
      </label>
      <input
        type="text"
        name="search"
        autoComplete="off"
        id="search"
        placeholder="elonmusk"
        className="mt-1 block h-12 w-full rounded-md border-gray-500 bg-neutral-900 text-lg text-gray-100 shadow-sm placeholder:text-gray-500 focus:border-[1px] focus:border-gray-300 focus:ring-1 focus:ring-emerald-700"
        value={username}
        onChange={handleChange}
      />
    </form>
  );
}

export default UsernameForm;
