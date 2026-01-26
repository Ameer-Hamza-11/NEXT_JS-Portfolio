"use client";


export type RecentUser = {
    id: number;
    name: string;
    userName: string;
    createdAt: Date;
  };

const RecentUsers = ({ data }: { data: RecentUser[] }) => {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground">No recent users added.</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-3 rounded-lg border p-3"
        >
          <div className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
            {user.name?.[0]}
          </div>

          <div className="flex-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">
              @{user.userName}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecentUsers
