import Adoption from "@/components/Home/Adoption";
import Header from "@/components/Home/Header";
import OurPets from "@/components/Home/OurPets";
import SignUp from "@/components/Home/SignUp";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-x-hidden">
      <Header />
      <Adoption />
      <OurPets />
      <SignUp />
    </div>
  );
}
