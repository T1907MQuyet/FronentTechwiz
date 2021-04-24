import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
    Infor: {
        id: number,
        Another: string, 
        Avatar: string, 
        Country: string, 
        Email: string, 
        FullName: string, 
        JobTitle: string, 
        Password: string,
        Phone: string,
        User_type: string
    };
    data: {
        user_info: {
            user_type_name: string
        }
    }
    
    // firstName: string;
    // lastName: string;
    // token?: string;

    // email: "string";
    // email_verified_at: "string";
    // address: "string";
    // phone: "string";
    // facebook_link: "string";
    // instagram_link: "string";
    // week_start_day: "string";
    // user_type: "string";
    // is_active: number;
    // created_at: ;
    // updated_at: "string";
    // user_type_name: "string";
}