import  UserTable  from "@/components/Home/components/team/UserTable";
export function UserWrapper() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <UserTable />
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div> */}
    </div>
  );
}
