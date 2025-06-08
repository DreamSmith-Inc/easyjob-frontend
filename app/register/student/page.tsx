import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentLogin from "./components/Login";
import StudentSignup from "./components/Signup";

export default function page() {
  return (
    <div className="mx-auto w-full mt-10 items-center justify-center max-w-lg flex flex-col gap-6">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <StudentLogin />
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <StudentSignup />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
