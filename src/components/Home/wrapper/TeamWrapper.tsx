import UserTable from "@/components/Home/team/components/UserTable";
import { useDispatch } from "react-redux";
import { useGetTeamMembersQuery } from "@/components/Home/team/api";
import { setTeamMembers } from "@/components/Home/team/teamSlice";
import { useEffect } from "react";
export function TeamWrapper() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const dispatch = useDispatch();
  const { data: teamData, refetch } = useGetTeamMembersQuery(
    userData?.user_id,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    refetch();
    if (teamData) {
      dispatch(setTeamMembers(teamData));
    }
  }, [teamData, dispatch, refetch]);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <UserTable />
    </div>
  );
}
