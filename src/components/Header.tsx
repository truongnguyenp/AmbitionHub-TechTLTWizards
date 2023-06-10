import Head from "next/head";
import WalletMultiButtonDynamic from "./WalletMultiButtonDynamic";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavItemsType {
  path: string;
  title: string;
}

const Header = () => {
  const { pathname } = useRouter();

  const NavItems: NavItemsType[] = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/createPost",
      title: "Create Post",
    },
    {
      path: "/createProfile",
      title: "Create Profile",
    },
  ];

  return (
    <>
      <Head>
        <title>Ambition Hub</title>
        <link
          rel="icon"
          href="https://gum.fun/_next/static/media/gum.7b85652b.svg"
        />
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <span className="text-2xl font-bold text-black logo">
              Ambition Hub
            </span>
          </Link>
        </div>
        <div>
          <ul className="flex items-center">
            {NavItems.map((item, index) => (
              <li className="mr-5 " key={index}>
                <Link
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? "text-blue-500 relative after:content-[''] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-500 after:left-0"
                      : "text-black "
                  } text-lg font-semibold`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.wallet}>
          <WalletMultiButtonDynamic />
        </div>
      </header>
    </>
  );
};

export default Header;
