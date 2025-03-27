import { Navbar } from "@/components/Landing/components/Navbar";
import Home from "@/components/Landing/components/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetPlansQuery } from "@/components/Landing/api";
import { setPlans } from "@/components/Landing/LandingSlice";

function Landing() {
  const dispatch = useDispatch();
  const { data: plansData, refetch } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    refetch();
    if (plansData) {
      dispatch(setPlans(plansData));
    }
  }, [plansData, dispatch, refetch]);

  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default Landing;
