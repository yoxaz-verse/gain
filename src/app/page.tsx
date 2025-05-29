"use client";
import EssentialTabContent from "@/components/dashboard/Essentials/essential-tab-content";
import Title, { SubTitle } from "@/components/titles";
import { Spacer } from "@nextui-org/react";
// import AuthContext from "@/context/AuthContext";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  // const { isAuthenticated } = useContext(AuthContext);

  // useEffect(() => {
  //   // Since AuthContext checks auth status on mount, we need to wait for it
  //   const checkAuthentication = () => {
  //     if (isAuthenticated) {
  //       router.push("/dashboard");
  //     } else {
  //       router.push("/auth");
  //     }
  //   };

  //   checkAuthentication();
  // }, [isAuthenticated, router]);
  return (
    <div className="  text-white mx-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="  flex justify-center  flex-col items-center">
          <Title title="GAIN" />
          <SubTitle title="Global Agro Industry Network" />
        </div>{" "}
      </motion.div>
      <Spacer y={6} />
      <EssentialTabContent essentialName="rules" showActions={false} />
    </div>
  );
}
