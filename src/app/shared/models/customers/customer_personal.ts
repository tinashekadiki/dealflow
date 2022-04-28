    export interface CustomerPersonal {
        id: number;
        customerGlobalId: string;
        createdAt: Date|string;
        dateOfBirth: string;
        educLevel: string;
        familyName: string;
        firstName: string;
        givenName: string;
        lastName: string;
        licenseExpirationDate: string;
        licenseIdNumber: string;
        licenseState: string;
        middleInitial: string;
        middleName: string;
        namePrefix: string;
        nameSuffix: string;
        nonResidentIndicator: string;
        privacyIndicator: string;
        privacyType: string;
        socialSecurityNumber?: any;
        socialSecurityNumberFraud1?: any;
        socialSecurityNumberFraud2?: any;
        socialSecurityNumberFraud3?: any;
        status?: any;
        statusDescription?: any;
        eyeColor: string;
        hairColor: string;
        heightInCm: string;
        heightInFtIn: string;
        sex: string;
        weightInKg?: any;
        weightInLbs: string;
    }


