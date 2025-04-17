import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import StudentSignupForm from "../../src/login/Signup/StudentSignupFrom";
import MentorSignupForm from "../../src/login/Signup/MentorSignupFrom";
import Login from "./Login";

export default function Signup() {
  const [userType, setUserType] = useState("student");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/", { replace: true }); // Added replace: true to prevent adding to history
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10">
      {/* Signup Card */}
      <Card className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black text-2xl font-bold hover:text-gray-600"
          onClick={handleClose} // Ensure this is using the correct handler
        >
          ×
        </button>

        <CardHeader className="text-center space-y-1 pt-10">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription>
            Choose your account type to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="max-h-[60vh] overflow-y-auto px-6 pb-6">
          <Tabs
            defaultValue="student"
            value={userType}
            onValueChange={setUserType}
            className="w-full"
          >
            <TabsList className="flex justify-center space-x-4 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <StudentSignupForm />
            </TabsContent>

            <TabsContent value="mentor">
              <MentorSignupForm />
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <button
              className="text-[#9b87f5] hover:underline"
              onClick={() => setIsLoginOpen(true)}
            >
              Log in
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setIsLoginOpen(false)}
            >
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}
