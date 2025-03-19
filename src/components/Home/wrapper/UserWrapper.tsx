import UserTable from "@/components/Home/components/team/components/UserTable";
import { useDispatch } from "react-redux";
import { useGetTeamQuery } from "@/components/Home/components/team/api";
import { setTeamMembers } from "@/components/Home/components/team/teamSlice";
import { useEffect } from "react";
export function UserWrapper() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const dispatch = useDispatch();
  const { data: teamData, refetch } = useGetTeamQuery(userData?.user_id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetch();
    if (teamData) {
      dispatch(setTeamMembers(teamData));
    }
  }, [teamData, dispatch, refetch]);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <UserTable />
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div> */}
    </div>
  );
}
