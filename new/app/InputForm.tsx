"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function InputForm() {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameInput.length === 0) {
      return;
    }
    const newUsername = usernameInput.replace("@", "");
    router.push(`/${newUsername}`);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Label htmlFor="handleInput" className="text-lg">
        Enter a username
      </Label>
      <div className="mt-1"></div>
      <Input
        id="handleInput"
        autoComplete="off"
        type="text"
        placeholder="elonmusk"
        className="dark:border-slate-700 text-lg h-12"
        value={usernameInput}
        onChange={handleUsernameChange}
      />
    </form>
  );
}

export default InputForm;
