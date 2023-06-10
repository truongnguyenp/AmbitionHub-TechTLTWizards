import styles from "@/styles/CreateProfile.module.css";
import { SDK, useGumContext, useProfile } from "@gumhq/react-sdk";
import { PublicKey } from "@solana/web3.js";
import Header from "@/components/Header";
import { Profile as ProfileFC } from "@/components/gum/Profile";

function Profile() {
  const { sdk } = useGumContext();
  const { profile } = useProfile(
    sdk,
    new PublicKey("HbaeYzrgBnM8gPshvNgd2xH7mV5fpBnAo3Gqwr1xfjD2")
  );
  const profileData = {
    ...profile?.metadata,
    following: profile?.following || 0,
    followers: profile?.followers || 0,
    connect: {
      following: false,
      follow: () => {
        alert("follow");
      },
      unfollow: () => {
        alert("unfollow");
      },
    },
  };
  return (
    <>
      <Header />
      <div className="">
        <h1 className="text-center">Profile</h1>
        {/* <form onSubmit={(event) => createUserAndProfile(event, name, bio, username, avatar)}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} className={styles.input} />
          <label htmlFor="bio" className={styles.label}>Bio</label>
          <input type="text" id="bio" value={bio} onChange={(event) => setBio(event.target.value)} className={styles.input} />
          <label htmlFor="username" className={styles.label}>Username</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} className={styles.input} />
          <label htmlFor="avatar" className={styles.label}>Avatar</label>
          <input type="text" id="avatar" value={avatar} onChange={(event) => setAvatar(event.target.value)} className={styles.input} />
          <button type="submit" className={styles.submitButton}>Create Profile</button>
        </form> */}
        <div className="flex justify-center">
          <ProfileFC data={profileData} />
        </div>
      </div>
    </>
  );
}

export default Profile;
