import React from "react";
import { useForm } from "react-hook-form";
import {
    TextInput,
    NumberInput,
    SelectInput,
    CheckboxInput,
    SwitchInput,
} from "../../components/formFields";
import { Button, Grid, Typography } from "@mui/material";
import { MultiSelectAutocompleteInput } from "../../components/multiSelect";
import { AutocompleteInput } from "../../components/autocomplete";

const ExampleForm = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
    };
const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Node", value: "node" },
  { label: "Anguler", value: "anguler" },
];
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ maxWidth: '800px', margin: 'auto' }}>
                <Typography variant="h5" gutterBottom>Reusable Form</Typography>
                <Grid size={{ xs: 12 }}>
                    <TextInput
                        label="Chapter Name"
                        name="chapterName"
                        // validation={false}
                        register={register}
                        errors={errors}
                    />
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                    <NumberInput
                        label="Course Price"
                        name="coursePrice"
                        register={register}
                        errors={errors}
                    />
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                    <NumberInput
                        label="Discount"
                        name="discount"
                        register={register}
                        errors={errors}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <SelectInput
                        label="Select Category"
                        name="category"
                        register={register}
                        errors={errors}
                        options={options}
                    />
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                    <AutocompleteInput
                        label="Select Framework"
                        name="framework"
                        control={{ setValue }}
                        options={options}
                        errors={errors}
                    />
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                <MultiSelectAutocompleteInput
                    label="Select Multiple Frameworks"
                    name="multiFramework"
                    control={{ setValue }}
                    options={options}
                    errors={errors}
                />
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                    <CheckboxInput
                        label="Is Free"
                        name="isFree"
                        register={register}
                    />
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                    <SwitchInput
                        label="Publish"
                        name="isPublished"
                        register={register}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Button variant="contained" type="submit">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ExampleForm;
