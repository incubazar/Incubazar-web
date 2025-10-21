export interface SAFETemplate {
  companyName: string
  founderName: string
  founderEmail: string
  investorName: string
  investorEmail: string
  investmentAmount: number
  valuationCap: number
  discountRate: number
  date: string
  companyAddress: string
  investorAddress: string
}

export const generateSAFETemplate = (data: SAFETemplate): string => {
  return `
SIMPLE AGREEMENT FOR FUTURE EQUITY (SAFE)

Company: ${data.companyName}
Founder: ${data.founderName}
Investor: ${data.investorName}

INVESTMENT AMOUNT: ₹${data.investmentAmount.toLocaleString()}
VALUATION CAP: ₹${data.valuationCap.toLocaleString()}
DISCOUNT RATE: ${data.discountRate}%

This Simple Agreement for Future Equity (the "Agreement") is entered into on ${data.date} between:

${data.companyName}, a company incorporated under the Companies Act, 2013, having its registered office at ${data.companyAddress} (the "Company"), represented by ${data.founderName} (${data.founderEmail}) (the "Founder");

AND

${data.investorName} (${data.investorEmail}), having address at ${data.investorAddress} (the "Investor").

WHEREAS, the Investor desires to make an investment in the Company in the amount of ₹${data.investmentAmount.toLocaleString()} (the "Investment Amount");

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. INVESTMENT
The Investor hereby agrees to invest the Investment Amount in the Company in exchange for the right to receive equity securities of the Company upon the occurrence of a Liquidity Event (as defined below).

2. VALUATION CAP AND DISCOUNT
The conversion of this SAFE shall be subject to:
- Valuation Cap: ₹${data.valuationCap.toLocaleString()}
- Discount Rate: ${data.discountRate}%

3. CONVERSION
This SAFE shall convert into equity securities of the Company upon the occurrence of a Liquidity Event, which shall be the earlier of:
(a) A sale of the Company;
(b) An IPO of the Company;
(c) A merger or acquisition of the Company.

4. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of India.

5. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

COMPANY:                           INVESTOR:
_________________                  _________________
${data.founderName}                ${data.investorName}
Founder                            Investor
${data.companyName}                Date: ${data.date}

Date: ${data.date}
  `.trim()
}