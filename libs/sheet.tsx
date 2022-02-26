import { google } from "googleapis";
import axios, { AxiosRequestConfig } from "axios";
import { parse } from "papaparse";

//GOOGLE API SETUP
const spreadsheet_Id = process.env.SPREADSHEETID;
const client_Email = process.env.CLIENT_EMAIL;
const private_Key = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n");

/**
 * 
 * @param {string} tableQuery Query language string. Quite similar to SQL queries.
 * example: \
 ``` Select A, B, C Limit 10 ``` \
 * A, B & C are column ids in Google sheet. Limit is a reserved keyword in google query language. \

 For adding parameters dynamically: \
 ``` Select A, B, C Where A contains '${params}' or C contains '${params}' ``` \
 ``` Where B contains '${params}' ``` \

 * For more information: [https://developers.google.com/chart/interactive/docs/querylanguage](https://developers.google.com/chart/interactive/docs/querylanguage)
 * 
 * @returns {Promise<any>}
 */

export const getSheetData = async (
  tableQuery: string,
  {
    spreadsheetID = spreadsheet_Id,
    clientEmail = client_Email,
    privateKey = private_Key,
    sheetId = 301152506,
  }: {
    spreadsheetID?: string | undefined;
    clientEmail?: string | undefined;
    privateKey?: string | undefined;
    sheetId?: number | string;
  }
): Promise<any> => {
  const gAuth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authorization = await gAuth.getRequestHeaders();

  let options: AxiosRequestConfig = {
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq`,
    params: {
      tq: tableQuery,
      gid: sheetId,
      tqx: "out:csv",
    },
    method: "get",
    headers: authorization,
  };

  try {
    const { data } = await axios.request(options);
    if (data.length) {
      const { data: parsedData, errors } = parse(data, {
        dynamicTyping: true,
        header: true,
      });

      if (errors) {
        console.log(errors);
      }
      return parsedData;
    } else {
      return data;
    }
  } catch (err: any) {
    console.log(err);
    return { error: err.message };
  }
};
