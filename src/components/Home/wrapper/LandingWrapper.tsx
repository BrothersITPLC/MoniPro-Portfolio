import { Banner } from "../Banner";
import { InfrastructureShowcase } from "@/components/Home/devices/components/InfrastructureShowcase";
import { useGetVmsQuery, useGetNetworksQuery } from "../devices/api";

export function LandingWrapper() {
  const { data: vmsData } = useGetVmsQuery({});
  const { data: networksData } = useGetNetworksQuery({});

  const vms = vmsData?.data || [];
  const networks = networksData?.data || [];

  return (
    <div className="w-full">
      <Banner />
      <div className="container mx-auto py-8">
        <InfrastructureShowcase vms={vms} networks={networks} />
      </div>
    </div>
  );
}
