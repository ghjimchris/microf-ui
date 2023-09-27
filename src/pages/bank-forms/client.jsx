import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const steps = [
  {
    id: 1,
    title: "Personal Details",
  },
  {
    id: 2,
    title: "Business Details",
  },
  {
    id: 3,
    title: "Loan Details",
  },
  {
    id: 4,
    title: "Guarantor's Data",
  },
];

let stepSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  middlename: yup.string().required("Middle name is required"),
  surname: yup.string().required("Surname is required"),
  dateofbirth: yup.date().required("Date of Birth is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number is not valid"),
  gender: yup.string().required("Gender is required"),
  region: yup.string().required("Region is required"),
  hometown: yup.string().required("Hometown is required"),
  nationality: yup.string().required("Nationality is required"),
  maritalStatus: yup.string().required("Marital Status is required"),
  numberOfDependents: yup
    .number()
    .typeError("Number of dependents must be a number")
    .required("Number of Dependents is required"),
  identityType: yup.string().required("Form of Identity is required"),
  idNumber: yup.string().required("ID Number is required"),
  idExpiry: yup.date().required("ID Expiry is required"),
  residentialAddress: yup.string().required("Residential Address is required"),
  passportPicture: yup.mixed().required("Passport Picture is required"),
});
let personalSchema = yup.object().shape({
  enterpriseOrEmployee: yup.string().required("Name of Enterprise or Employee is required"),
  position: yup.string(),
  businessAddress: yup.string().required("Business Address is required"),
  natureOfBusiness: yup.string().required("Nature of Business is required"),
  gpsAddress: yup.string().required("GPS Address is required"),
  monthlyIncome: yup.string().required("Average Monthly Income/Revenue is required"),
  otherIncomes: yup.string(),
});

const regionsInGhana = [
  "Ashanti",
  "Brong-Ahafo",
  "Central",
  "Eastern",
  "Greater Accra",
  "Northern",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
];

const nationalities = ["Ghanaian", "Other"];
const maritalStatusOptions = ["Married", "Single", "Divorced"];
const identityOptions = ["Passport", "Ghana Card", "Driver's License", "Voter's ID Card"];

const FormWizard = () => {
  const [stepNumber, setStepNumber] = useState(0);

  // find current step schema
  let currentStepSchema;
  switch (stepNumber) {
    case 0:
      currentStepSchema = stepSchema;
      break;
    case 1:
      currentStepSchema = personalSchema;
      break;
    case 2:
      currentStepSchema = addressSchema;
      break;
    case 3:
      currentStepSchema = socialSchema;
      break;
    default:
      currentStepSchema = stepSchema;
  }

  useEffect(() => {
    // console.log("step number changed");
  }, [stepNumber]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    // keep watch on all fields
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      // Validate the current step's schema
      await currentStepSchema.validate(data, { abortEarly: false });

      // next step until the last step, if it's the last step, then submit the form
      let totalSteps = steps.length;
      const isLastStep = stepNumber === totalSteps - 1;
      if (isLastStep) {
        console.log(data);
      } else {
        setStepNumber(stepNumber + 1);
      }
    } catch (error) {
      // Handle validation errors
      console.error(error);
    }
  };

  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  return (
    <div>
      <Card title="Vertical">
        <div className="grid gap-5 grid-cols-12">
          <div className="lg:col-span-3 col-span-12">
            <div className="flex z-[5] items-start relative flex-col lg:min-h-full md:min-h-[300px] min-h-[250px]">
              {steps.map((item, i) => (
                <div className="relative z-[1] flex-1 last:flex-none" key={i}>
                  <div
                    className={`${
                      stepNumber >= i
                        ? "bg-slate-900 text-white ring-slate-900 dark:bg-slate-900 dark:ring-slate-700  dark:ring-offset-slate-500 ring-offset-2"
                        : "bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 text-opacity-70 dark:bg-slate-700 dark:ring-slate-700"
                    } 
            transition duration-150 icon-box md:h-12 md:w-12 h-8 w-8 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium
            `}
                  >
                    {stepNumber <= i ? (
                      <span> {i + 1}</span>
                    ) : (
                      <span className="text-3xl">
                        <Icon icon="bx:check-double" />
                      </span>
                    )}
                  </div>

                  <div
                    className={` ${
                      stepNumber >= i
                        ? "bg-slate-900 dark:bg-slate-900"
                        : "bg-[#E0EAFF] dark:bg-slate-600"
                    } absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px]`}
                  ></div>
                  <div
                    className={` ${
                      stepNumber >= i
                        ? " text-slate-900 dark:text-slate-300"
                        : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                    } absolute top-0 ltr:left-full rtl:right-full ltr:pl-4 rtl:pr-4 text-base leading-6 md:mt-3 mt-1 transition duration-150 w-full`}
                  >
                    <span className="w-max block">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="conten-box lg:col-span-9 col-span-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              {stepNumber === 0 && (
                <div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="lg:col-span-3 md:col-span-2 col-span-1">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                        Enter Your Account Details
                      </h4>
                    </div>
                    <Textinput
                      label="First Name"
                      type="text"
                      placeholder="First Name"
                      name="firstname"
                      error={errors.firstname}
                      register={register}
                    />
                    <Textinput
                      label="Middle Name"
                      type="text"
                      placeholder="Middle Name"
                      name="middlename"
                      error={errors.middlename}
                      register={register}
                    />
                    <Textinput
                      label="Surname"
                      type="text"
                      placeholder="Surname"
                      name="surname"
                      error={errors.surname}
                      register={register}
                    />
                    <Textinput
                      label="Date of Birth"
                      type="date"
                      placeholder="Date of Birth"
                      name="dateofbirth"
                      error={errors.dateofbirth}
                      register={register}
                    />
                    <Textinput
                      label="Email"
                      type="email"
                      placeholder="Type your email"
                      name="email"
                      error={errors.email}
                      register={register}
                    />
                    <InputGroup
                      label="Phone Number"
                      type="text"
                      prepend="MY (+233)"
                      placeholder="Phone Number"
                      name="phone"
                      error={errors.phone}
                      register={register}
                    />
                    <div className="md:col-span-1 col-span-1">
                      <label
                        htmlFor="gender"
                        className="block text-slate-900 dark:text-slate-300 text-base font-medium mb-2"
                      >
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          id="gender"
                          name="gender"
                          {...register("gender")}
                          className="w-full border-gray-300 dark:border-slate-700 focus:ring-slate-900 dark:focus:ring-slate-300 focus:border-slate-900 dark:focus:border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {errors.gender && (
                          <p className="mt-2 text-red-500 text-sm">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-1 col-span-1">
                      <label
                        htmlFor="region"
                        className="block text-slate-900 dark:text-slate-300 text-base font-medium mb-2"
                      >
                        Region
                      </label>
                      <div className="relative">
                        <select
                          id="region"
                          name="region"
                          {...register("region")}
                          className="w-full border-gray-300 dark:border-slate-700 focus:ring-slate-900 dark:focus:ring-slate-300 focus:border-slate-900 dark:focus:border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                          {regionsInGhana.map((region) => (
                            <option key={region} value={region}>
                              {region}
                            </option>
                          ))}
                        </select>
                        {errors.region && (
                          <p className="mt-2 text-red-500 text-sm">
                            {errors.region.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <Textinput
                      label="Hometown"
                      type="text"
                      placeholder="Hometown"
                      name="hometown"
                      error={errors.hometown}
                      register={register}
                    />
                    <div className="md:col-span-1 col-span-1">
                      <label
                        htmlFor="nationality"
                        className="block text-slate-900 dark:text-slate-300 text-base font-medium mb-2"
                      >
                        Nationality
                      </label>
                      <div className="relative">
                        <select
                          id="nationality"
                          name="nationality"
                          {...register("nationality")}
                          className="w-full border-gray-300 dark:border-slate-700 focus:ring-slate-900 dark:focus:ring-slate-300 focus:border-slate-900 dark:focus:border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                          {nationalities.map((nationality) => (
                            <option key={nationality} value={nationality}>
                              {nationality}
                            </option>
                          ))}
                        </select>
                        {errors.nationality && (
                          <p className="mt-2 text-red-500 text-sm">
                            {errors.nationality.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-1 col-span-1">
                      <label
                        htmlFor="maritalStatus"
                        className="block text-slate-900 dark:text-slate-300 text-base font-medium mb-2"
                      >
                        Marital Status
                      </label>
                      <div className="relative">
                        <select
                          id="maritalStatus"
                          name="maritalStatus"
                          {...register("maritalStatus")}
                          className="w-full border-gray-300 dark:border-slate-700 focus:ring-slate-900 dark:focus:ring-slate-300 focus:border-slate-900 dark:focus:border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                          {maritalStatusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        {errors.maritalStatus && (
                          <p className="mt-2 text-red-500 text-sm">
                            {errors.maritalStatus.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <Textinput
                      label="Number of Dependents"
                      type="number"
                      placeholder="Number of Dependents"
                      name="numberOfDependents"
                      error={errors.numberOfDependents}
                      register={register}
                    />
                    <div className="md:col-span-1 col-span-1">
                      <label
                        htmlFor="identityType"
                        className="block text-slate-900 dark:text-slate-300 text-base font-medium mb-2"
                      >
                        Form of Identity
                      </label>
                      <div className="relative">
                        <select
                          id="identityType"
                          name="identityType"
                          {...register("identityType")}
                          className="w-full border-gray-300 dark:border-slate-700 focus:ring-slate-900 dark:focus:ring-slate-300 focus:border-slate-900 dark:focus:border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                          {identityOptions.map((identity) => (
                            <option key={identity} value={identity}>
                              {identity}
                            </option>
                          ))}
                        </select>
                        {errors.identityType && (
                          <p className="mt-2 text-red-500 text-sm">
                            {errors.identityType.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <Textinput
                      label="ID Number"
                      type="text"
                      placeholder="ID Number"
                      name="idNumber"
                      error={errors.idNumber}
                      register={register}
                    />
                    <Textinput
                      label="ID Expiry"
                      type="date"
                      placeholder="ID Expiry"
                      name="idExpiry"
                      error={errors.idExpiry}
                      register={register}
                    />
                    <Textinput
                      label="Residential Address"
                      type="text"
                      placeholder="Residential Address"
                      name="residentialAddress"
                      error={errors.residentialAddress}
                      register={register}
                    />
                    <Textinput
                      label="Passport Picture"
                      type="file"
                      name="passportPicture"
                      error={errors.passportPicture}
                      register={register}
                    />
                  </div>
                </div>
              )}

              {/* ... Rest of the form steps ... */}
              {/* STEP 2 */}
              {stepNumber === 1 && (
                <div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="lg:col-span-3 md:col-span-2 col-span-1">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                        Business Details
                      </h4>
                    </div>
                    <Textinput
                      label="Name of Enterprise or Employee"
                      type="text"
                      placeholder="Name of Enterprise or Employee"
                      name="enterpriseOrEmployee"
                      error={errors.enterpriseOrEmployee}
                      register={register}
                    />
                    <Textinput
                      label="Position (if Employee)"
                      type="text"
                      placeholder="Position (if Employee)"
                      name="position"
                      error={errors.position}
                      register={register}
                    />
                    <Textinput
                      label="Business Address"
                      type="text"
                      placeholder="Business Address"
                      name="businessAddress"
                      error={errors.businessAddress}
                      register={register}
                    />
                    <Textinput
                      label="Nature of Business"
                      type="text"
                      placeholder="Nature of Business"
                      name="natureOfBusiness"
                      error={errors.natureOfBusiness}
                      register={register}
                    />
                    <Textinput
                      label="GPS Address"
                      type="text"
                      placeholder="GPS Address"
                      name="gpsAddress"
                      error={errors.gpsAddress}
                      register={register}
                    />
                    <Textinput
                      label="Average Monthly Income/Revenue"
                      type="number"
                      placeholder="Average Monthly Income/Revenue"
                      name="monthlyIncome"
                      error={errors.monthlyIncome}
                      register={register}
                    />
                    <Textinput
                      label="Other Incomes"
                      type="number"
                      placeholder="Other Incomes"
                      name="otherIncomes"
                      error={errors.otherIncomes}
                      register={register}
                    />
                  </div>
                </div>
              )}


               {/* ... Rest of the form steps ... */}
              <div
                className={`${
                  stepNumber > 0 ? "flex justify-between" : " text-right"
                } mt-10`}
              >
                {stepNumber !== 0 && (
                  <Button
                    text="prev"
                    className="btn-dark"
                    onClick={handlePrev}
                  />
                )}
                <Button
                  text={stepNumber !== steps.length - 1 ? "next" : "submit"}
                  className="btn-dark"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormWizard;
