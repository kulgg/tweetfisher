import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import React from "react";
import GrayButton from "./ui/buttons/gray-button";

export type UsernameFormProps = {
  username: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSettingsClick: () => void;
};

function UsernameForm({
  username,
  handleChange,
  handleSubmit,
  handleSettingsClick,
}: UsernameFormProps) {
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center justify-between pr-1">
        <label
          htmlFor="search"
          className="block text-lg font-medium text-indigo-200"
        >
          Enter a username
        </label>
        <div className="mb-1">
          <GrayButton handleClick={handleSettingsClick}>
            <div className="mt-[1px] w-5">
              <Cog6ToothIcon />
            </div>
            <div>Settings</div>
          </GrayButton>
        </div>
      </div>
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
