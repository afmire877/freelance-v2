export enum Borough {
  Hackney = "14a527a3-18c3-4e28-9b8b-2ba71eaf5ae4",
  Newham = "3670b68a-2733-4db8-8d7e-b773e578fd50",
  TowerHamlets = "444124ac-a6d6-4aa9-aa5f-70c9d057ec0c",
  WalthamForest = "fba47a0e-8a0e-41ba-9607-201944ece8b2",
}

export enum NewsletterOptions {
  No = "5f4d0538-082e-4bb1-96be-0e215fbb4bec",
  Yes = "c77cbff8-e224-46a2-a233-41fa9fa57074",
}

// https://anewdirection.submittable.com/submit/24e60f51-4920-4d05-8e0f-44359387b0fa/freelance-career-naivgator-tool

interface ICreateBody {
  email: string;
  firstName: string;
  lastName: string;
  projectId: string;
  phone: string;
  dob: string;
  newsletter: NewsletterOptions;
  personalData: boolean;
  borough: Borough;
}

export const createBody = ({
  email,
  firstName,
  lastName,
  projectId,
  dob,
  phone,
  newsletter,
  personalData,
  borough,
}: ICreateBody) => {
  return {
    email,
    firstName,
    lastName,
    projectId,
    fieldData: [
      {
        formFieldId: "41a8316b-c393-4cdf-92a3-10343cae8f01",
        fieldType: "short_answer",
        value: firstName,
      },
      {
        formFieldId: "6e0bac39-b840-407f-bf17-4fc4b95ac21a",
        fieldType: "short_answer",
        value: lastName,
      },
      {
        formFieldId: "871504cd-7c4b-4e26-b5ab-2a8429683dc3",
        fieldType: "email",
        value: email,
      },
      {
        formFieldId: "eb357f5f-9b9d-4055-888c-72f1d9403069",
        fieldType: "phone",
        value: phone,
      },
      {
        options: [borough],
        formFieldId: "c861c7e0-fbaf-43ca-a6ee-da4737238736",
        fieldType: "dropdown_list",
      },
      {
        formFieldId: "9d310c39-40b4-43ad-abd2-310e2b8b764a",
        fieldType: "date",
        value: dob + " 00:00:00", // "04/26/2003 00:00:00"
      },
      {
        options: [newsletter],
        formFieldId: "f866eeb4-5fd3-4d97-baa4-0291251ed446",
        fieldType: "single_response",
      },
      {
        value: personalData,
        formFieldId: "68ce9c95-dc21-4186-b3d9-a94e2e204fdc",
        fieldType: "single_checkbox",
      },
      {
        formFieldId: "869aa449-a82e-4205-9e87-2d5bf1a2162d",
        fieldType: "short_answer",
        value: "", //  Coach Report Link
      },
      {
        formFieldId: "1c760803-6118-444a-8a01-eff333953343",
        fieldType: "short_answer",
        value: "", // Submitter Report Link
      },
    ],
  };
};

export const form_structure = {
  currencyCode: "USD",
  formId: "2f9a4f81-c86a-464b-9d34-36307dd13f14",
  name: "Freelancer's Odyssey form",
  fields: [
    {
      countType: "characters",
      formFieldId: "41a8316b-c393-4cdf-92a3-10343cae8f01",
      fieldType: "short_answer",
      label: "Applicant's First Name",
      isRequired: true,
    },
    {
      countType: "characters",
      formFieldId: "6e0bac39-b840-407f-bf17-4fc4b95ac21a",
      fieldType: "short_answer",
      label: "Applicant's Last Name",
      isRequired: true,
    },
    {
      formFieldId: "871504cd-7c4b-4e26-b5ab-2a8429683dc3",
      fieldType: "email",
      label: "Email Address:",
      isRequired: true,
    },
    {
      defaultCountry: "GB",
      formFieldId: "eb357f5f-9b9d-4055-888c-72f1d9403069",
      fieldType: "phone",
      label: "Mobile Phone Number:",
      isRequired: true,
    },
    {
      options: [
        {
          formOptionId: "14a527a3-18c3-4e28-9b8b-2ba71eaf5ae4",
          label: "Hackney",
          isEligible: false,
        },
        {
          formOptionId: "3670b68a-2733-4db8-8d7e-b773e578fd50",
          label: "Newham",
          isEligible: false,
        },
        {
          formOptionId: "444124ac-a6d6-4aa9-aa5f-70c9d057ec0c",
          label: "Tower Hamlets",
          isEligible: false,
        },
        {
          formOptionId: "fba47a0e-8a0e-41ba-9607-201944ece8b2",
          label: "Waltham Forest",
          isEligible: false,
        },
        {
          formOptionId: "9a4ed32f-eacc-46bb-a4a6-271efdba792a",
          label: "Other ",
          isEligible: false,
        },
      ],
      autoLabel: true,
      formFieldId: "c861c7e0-fbaf-43ca-a6ee-da4737238736",
      fieldType: "dropdown_list",
      label: "London Borough:",
      additionalInstructions:
        '{"blocks":[{"key":"5bko6","text":"Please note you must be a current resident of Hackney, Newham, Tower Hamlets or Waltham Forest to apply. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      isRequired: true,
    },
    {
      minValue: "04/26/1993 00:00:00",
      maxValue: "04/26/2005 00:00:00",
      formFieldId: "9d310c39-40b4-43ad-abd2-310e2b8b764a",
      fieldType: "date",
      label: "DOB:",
      additionalInstructions:
        '{"blocks":[{"key":"csdq6","text":"MM/DD/YYYY - Please note that you must be aged 18-30 to apply","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      isRequired: true,
    },
    {
      formFieldId: "e07b1aaf-2dff-44d5-91a6-d5fcbf85ff6c",
      fieldType: "divider",
    },
    {
      options: [
        {
          formOptionId: "c77cbff8-e224-46a2-a233-41fa9fa57074",
          label: "Yes",
          customAutoLabel: "Newsletter",
          isEligible: false,
        },
        {
          formOptionId: "5f4d0538-082e-4bb1-96be-0e215fbb4bec",
          label: "No",
          isEligible: false,
        },
      ],
      isCustomAutoLabel: true,
      formFieldId: "f866eeb4-5fd3-4d97-baa4-0291251ed446",
      fieldType: "single_response",
      label:
        "Would you like to subscribe to the Local Champions and Good Growth Hub newsletter to get updates on the latest jobs, opportunities and events from London's creative industry?",
      isRequired: true,
    },
    {
      customAutoLabel: "Newsletter ",
      formFieldId: "68ce9c95-dc21-4186-b3d9-a94e2e204fdc",
      fieldType: "single_checkbox",
      label:
        "I have read the above and I understand and accept how Good Growth Hub (A New Direction) and Local Champions will use my personal data.",
      isRequired: true,
    },
    {
      formFieldId: "869aa449-a82e-4205-9e87-2d5bf1a2162d",
      fieldType: "short_answer",
      label: "Coach Report Link:",
    },
    {
      formFieldId: "1c760803-6118-444a-8a01-eff333953343",
      fieldType: "short_answer",
      label: "Submitter Report Link:",
    },
  ],
  branches: [],
  blocks: [],
  formType: "initial",
  createdBy: "3fd3a5c4-afc6-430c-8e8a-0192d1fd9372",
  createdAt: "2024-04-13T21:04:36.2269615Z",
};
