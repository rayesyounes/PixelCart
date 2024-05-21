"use client";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { UpdateUserSettings, type State } from "@/app/actions";
import Submitbutton from "@/components/buttons/SubmitButton";

interface iAppProps {
    firstName: string;
    lastName: string;
    email: string;
}

export default function SettingsForm({ email, firstName, lastName }: iAppProps) {
    const initalState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(UpdateUserSettings, initalState);

    useEffect(() => {
        if (state?.status === "error") {
            toast.warning(state.message);
        } else if (state?.status === "success") {
            toast.success(state.message);
        }
    }, [state]);
    return (
        <form action={formAction}>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                    Here you will find settings regarding your account
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-2">
                    <Label>First Name</Label>
                    <Input name="firstName" type="text" defaultValue={firstName} />
                    {state?.status === "error" && state?.errors?.firstName && (
                        <p className="text-red-500 text-sm">{state?.errors?.firstName}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Last Name</Label>
                    <Input name="lastName" type="text" defaultValue={lastName} />
                    {state?.status === "error" && state?.errors?.lastName && (
                        <p className="text-red-500 text-sm">{state?.errors?.lastName}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Email</Label>
                    <Input
                        name="email"
                        type="email"
                        disabled
                        defaultValue={email}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Submitbutton title="Update your Information" />
            </CardFooter>
        </form>
    );
}