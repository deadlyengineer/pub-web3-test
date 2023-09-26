import { useEffect, useState } from "react";
import { singin } from "../services/auth.service";

declare const window: any;

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const connectMetamask = async () => {
    if (typeof window !== "undefined") {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = account[0];
      const result = await singin(address);
      setAddress(result.data.data.address);
      localStorage.setItem("address", result.data.data.address);
      localStorage.setItem("token", result.data.data.token);
      setIsLogin(true);
      const event = new Event("login");
      window.dispatchEvent(event);
    }
    return null;
  };

  useEffect(() => {
    setAddress(localStorage.getItem("address"));
  }, [isLogin]);

  useEffect(() => {
    if (localStorage.getItem('token')) setIsLogin(true);
  }, [])
  return (
    <div className="navbar">
      {isLogin ? (
        <p>{address}</p>
      ) : (
        <div className="connect-btn" onClick={connectMetamask}>
          Connect Metamask
        </div>
      )}
    </div>
  );
};
