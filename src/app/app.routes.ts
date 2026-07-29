import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ProfilePage } from './profile-page/profile-page';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    // {path:'login',component:LoginPage},
    // {path:'signup',component:SignupPage}
    {path:'home',component:HomePage},
    {path:'profile',component:ProfilePage},
    // {path:'cart',component:CartPage},
    
];
