import styles from "@/styles/Home.module.css";
import { SocialFeed } from "@/components/SocialFeed";
import { MyProfile } from "@/components/MyProfile";
import { GumUserCreateButton } from "@/components/CreateUserButton";
import Header from "@/components/Header";
import CreatePost from "@/components/CreatePost";

function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* <div className={styles.container}>
          <MyProfile />
        </div> */}
        {/* <CreatePost /> */}
        <SocialFeed />
        {/* <GumUserCreateButton /> */}
      </main>
    </>
  );
}

export default Home;
