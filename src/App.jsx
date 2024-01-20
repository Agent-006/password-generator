import { Copy } from "lucide-react";
import React, { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [allowCharacters, setAllowCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(
    function () {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (allowNumbers) str += "0123456789";
      if (allowCharacters) str += "*(){}[]@#&%!`~_-";

      for (let index = 1; index <= length; index++) {
        let char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }

      setPassword(pass);
    },
    [length, allowNumbers, allowCharacters, setPassword]
  );

  useEffect(() => {
    passwordGenerator();
  }, [length, allowNumbers, allowCharacters, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passRef = useRef(null);

  return (
    <>
      <div className="absolute z-10 w-full h-screen bg-zinc-800 flex flex-col items-center justify-center">
        <h4 className="absolute z-10 top-0 py-10 text-zinc-500 font-bold tracking-wide">
          Password Generator
        </h4>
        <h1 className="text-zinc-900 md:text-[120px] lg:text-[140px] text-[80px] font-bold">
          Password
        </h1>
      </div>

      <div className="absolute z-20 w-full h-screen flex flex-col items-center justify-start">
        <div className="lg:w-2/5 md:w-2/5 w-5/6 flex md:mt-[180px] lg:mt-[200px] mt-[150px]">
          <input
            ref={passRef}
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="w-full outline-none py-2 px-3 rounded-xl text-zinc-800 font-semibold"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="text-zinc-100 hover:text-zinc-500 mx-3"
          >
            <Copy />
          </button>
        </div>

        <div
          className="md:w-2/5 lg:w-2/5 w-4/5 my-5 md:h-10 lg:h-10 h-62 flex flex-col md:flex-row lg:flex-row md:justify-start lg:justify-start justify-center md:gap-8
        lg:gap-8 gap-2  items-start md:items-center lg:items-center px-3"
        >
          <div className="flex items-center justify-center mb-5 mt-2 md:mb-0 lg:mb-0 md:mt-0 lg:mt-0">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label className="text-zinc-300 font-semibold mx-3">
              Length: {length}
            </label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              value={allowNumbers}
              onChange={() => setAllowNumbers((prev) => !prev)}
              className="cursor-pointer md:h-16 lg:h-16 h-10"
            />
            <label className="text-zinc-300 font-semibold mx-2">Number</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              value={allowCharacters}
              onChange={() => setAllowCharacters((prev) => !prev)}
              className="cursor-pointer md:h-16 lg:h-16 h-10"
            />
            <label className="text-zinc-300 font-semibold mx-2">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
