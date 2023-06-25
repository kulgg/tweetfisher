"use client";

import { accountStatusAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

function AccountStatus({ handle }: { handle: string }) {
  const [accountStatus, setAccountStatus] = useAtom(accountStatusAtom);

  useEffect(() => {
    console.log(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/account/${handle}`
    );
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/account/${handle}`)
      .then((x) => x.json())
      .then((x) => {
        setAccountStatus(x.accountType);
      });
  }, []);

  return <div>{accountStatus}</div>;
}

export default AccountStatus;

export { accountStatusAtom };
