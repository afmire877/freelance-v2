import React from "react";
import { Card } from "~/components/IncompleteCard";
import useUserStore from "~/store/userStore";
import { api } from "~/utils/api";

export default function IncompletePage() {
  const user = useUserStore((state) => state.user);
  const { data } = api.submission.getIncomplete.useQuery({
    email: user?.email ?? undefined,
  });

  return (
    <div className="mx-auto my-3 max-w-4xl">
      <h2 className="mb-5">Incomplete</h2>

      {data?.map(({ id }) => <Card key={id} title={id} description={""} />)}
    </div>
  );
}
