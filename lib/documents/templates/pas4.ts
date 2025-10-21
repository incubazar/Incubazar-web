export interface PAS4Template {
  companyName: string
  companyAddress: string
  incorporationNumber: string
  dateOfIncorporation: string
  authorizedCapital: number
  paidUpCapital: number
  investorName: string
  investorAddress: string
  investorPAN: string
  investmentAmount: number
  numberOfShares: number
  faceValue: number
  premium: number
  totalConsideration: number
  date: string
  place: string
}

export const generatePAS4Template = (data: PAS4Template): string => {
  return `
FORM PAS-4
PRIVATE PLACEMENT OFFER LETTER

Company: ${data.companyName}
CIN: ${data.incorporationNumber}
Registered Office: ${data.companyAddress}

PRIVATE PLACEMENT OFFER LETTER

To,
${data.investorName}
${data.investorAddress}

Subject: Private Placement of Equity Shares

Dear Sir/Madam,

We are pleased to offer you the opportunity to subscribe to equity shares of ${data.companyName} (the "Company") through a private placement in accordance with Section 42 of the Companies Act, 2013.

COMPANY DETAILS:
- Company Name: ${data.companyName}
- Registered Office: ${data.companyAddress}
- Date of Incorporation: ${data.dateOfIncorporation}
- Authorized Capital: ₹${data.authorizedCapital.toLocaleString()}
- Paid-up Capital: ₹${data.paidUpCapital.toLocaleString()}

INVESTMENT DETAILS:
- Investment Amount: ₹${data.investmentAmount.toLocaleString()}
- Number of Shares: ${data.numberOfShares.toLocaleString()}
- Face Value per Share: ₹${data.faceValue}
- Premium per Share: ₹${data.premium}
- Total Consideration: ₹${data.totalConsideration.toLocaleString()}

TERMS AND CONDITIONS:
1. This offer is made to a maximum of 200 persons in aggregate in a financial year.
2. The minimum investment amount is ₹${data.investmentAmount.toLocaleString()}.
3. The shares will be issued at a premium of ₹${data.premium} per share.
4. The investor must be a resident of India.
5. The investor must provide PAN and other KYC documents.

COMPLIANCE:
This private placement is being made in compliance with:
- Section 42 of the Companies Act, 2013
- Rule 14 of the Companies (Prospectus and Allotment of Securities) Rules, 2014
- SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018

RISK FACTORS:
Investment in equity shares involves risk. The investor should carefully consider the risk factors before making an investment decision.

ACCEPTANCE:
If you wish to accept this offer, please sign and return this letter along with the subscription amount and required documents within 15 days from the date of this letter.

This offer is valid for 15 days from the date of this letter.

Yours faithfully,

For ${data.companyName}

_________________
Authorized Signatory
Date: ${data.date}
Place: ${data.place}

INVESTOR ACCEPTANCE:

I/We hereby accept the above offer and agree to subscribe to the equity shares on the terms and conditions mentioned above.

Name: ${data.investorName}
Address: ${data.investorAddress}
PAN: ${data.investorPAN}
Investment Amount: ₹${data.investmentAmount.toLocaleString()}

Signature: _________________
Date: ${data.date}
  `.trim()
}