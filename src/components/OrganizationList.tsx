import { OrganizationSwitcher } from "@clerk/nextjs";

const OrganizationList = () => {
  return (
    <OrganizationSwitcher
      afterSelectOrganizationUrl="/browser/:id"
      afterLeaveOrganizationUrl="/"
      afterSelectPersonalUrl="/:id"
      fallback={<div>loading...</div>}
    />
  );
};

export default OrganizationList;
