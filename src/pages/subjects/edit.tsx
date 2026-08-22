import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "@refinedev/react-hook-form";
import {type BaseRecord, type HttpError, useBack, useSelect,} from "@refinedev/core";
import * as z from "zod";

import {EditView} from "@/components/refine-ui/views/edit-view";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";

const subjectSchema = z.object({
    code: z
        .string()
        .min(2, "Subject code must be at least 2 characters"),

    name: z
        .string()
        .min(3, "Subject name must be at least 3 characters"),

    description: z
        .string()
        .min(5, "Subject description must be at least 5 characters"),

    departmentId: z.coerce
        .number()
        .positive("Please select a department"),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

const SubjectsEdit = () => {
    const back = useBack();

    // Fetch departments for the dropdown
    const {options: departmentOptions, query: departmentQuery} =
        useSelect({
            resource: "departments",
            optionLabel: "name",
            optionValue: "id",
            pagination: {
                mode: "off",
            },
        });

    const form = useForm<BaseRecord, HttpError, SubjectFormValues>({
        resolver: zodResolver(subjectSchema),

        refineCoreProps: {
            resource: "subjects",
            action: "edit",
        },

        defaultValues: {
            code: "",
            name: "",
            description: "",
            departmentId: 0,
        },
    });

    const {
        refineCore: {onFinish},
        handleSubmit,
        formState: {isSubmitting},
        control,
    } = form;

    const onSubmit = async (values: SubjectFormValues) => {
        try {
            await onFinish(values);
        } catch (error) {
            console.error("Error updating subject:", error);
        }
    };

    return (
        <EditView className="class-view">
            <Breadcrumb/>

            <h1 className="page-title">Edit Subject</h1>

            <div className="intro-row">
                <p>Update the subject information below.</p>

                <Button onClick={() => back()}>
                    Go Back
                </Button>
            </div>

            <Separator/>

            <div className="my-4 flex items-center">
                <Card className="class-form-card">
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
                            Edit Subject
                        </CardTitle>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="mt-7">
                        <Form {...form}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                {/* Subject Code */}
                                <FormField
                                    control={control}
                                    name="code"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Subject Code{" "}
                                                <span className="text-orange-600">
                                                    *
                                                </span>
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="CS101"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Subject Name */}
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Subject Name{" "}
                                                <span className="text-orange-600">
                                                    *
                                                </span>
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="Data Structures"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Description{" "}
                                                <span className="text-orange-600">
                                                    *
                                                </span>
                                            </FormLabel>

                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe the subject..."
                                                    className="min-h-28"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Department */}
                                <FormField
                                    control={control}
                                    name="departmentId"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Department{" "}
                                                <span className="text-orange-600">
                                                    *
                                                </span>
                                            </FormLabel>

                                            <Select
                                                value={
                                                    field.value
                                                        ? String(field.value)
                                                        : ""
                                                }
                                                onValueChange={(value) => {
                                                    field.onChange(
                                                        Number(value)
                                                    );
                                                }}
                                                disabled={
                                                    departmentQuery.isLoading
                                                }
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                departmentQuery.isLoading
                                                                    ? "Loading departments..."
                                                                    : "Select Department"
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    {departmentOptions.map(
                                                        (department) => (
                                                            <SelectItem
                                                                key={
                                                                    department.value
                                                                }
                                                                value={String(
                                                                    department.value
                                                                )}
                                                            >
                                                                {
                                                                    department.label
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Update Button */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={
                                        isSubmitting ||
                                        departmentQuery.isLoading
                                    }
                                >
                                    {isSubmitting
                                        ? "Updating..."
                                        : "Update Subject"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </EditView>
    );
};

export default SubjectsEdit;