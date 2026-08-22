import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "@refinedev/react-hook-form";
import {type BaseRecord, type HttpError, useBack,} from "@refinedev/core";
import * as z from "zod";

import {EditView} from "@/components/refine-ui/views/edit-view";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";

const facultySchema = z.object({
    name: z
        .string()
        .min(3, "Faculty name must be at least 3 characters"),

    email: z
        .string()
        .email("Please enter a valid email address"),
});

type FacultyFormValues = z.infer<typeof facultySchema>;

const FacultyEdit = () => {
    const back = useBack();

    const form = useForm<BaseRecord, HttpError, FacultyFormValues>({
        resolver: zodResolver(facultySchema),

        refineCoreProps: {
            resource: "users",
            action: "edit",
        },

        defaultValues: {
            name: "",
            email: "",
        },
    });

    const {
        refineCore: {onFinish},
        handleSubmit,
        formState: {isSubmitting},
        control,
    } = form;

    const onSubmit = async (values: FacultyFormValues) => {
        try {
            await onFinish(values);
        } catch (error) {
            console.error("Error updating faculty:", error);
        }
    };

    return (
        <EditView className="class-view">
            <Breadcrumb/>

            <h1 className="page-title">Edit Faculty</h1>

            <div className="intro-row">
                <p>Update the faculty information below.</p>

                <Button onClick={() => back()}>
                    Go Back
                </Button>
            </div>

            <Separator/>

            <div className="my-4 flex items-center">
                <Card className="class-form-card">
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
                            Edit Faculty
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="mt-7">
                        <Form {...form}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                {/* Faculty Name */}
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Faculty Name{" "}
                                                <span className="text-orange-600">
                                                    *
                                                </span>
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="Enter faculty name"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email{" "}
                                                <span className="text-orange-600">
                                                    *
                                                </span>
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="faculty@example.com"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Updating..."
                                        : "Update Faculty"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </EditView>
    );
};

export default FacultyEdit;