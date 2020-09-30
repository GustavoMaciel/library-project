import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'authors',
        loadChildren: () => import('src/app/components/author/author.module').then(m => m.AuthorModule)
      },
      {
        path: 'books',
        loadChildren: () => import('src/app/components/book/book.module').then(m => m.BookModule)
      },
      {
        path: 'associate',
        loadChildren: () => import('src/app/components/author-book/author-book.module').then(m => m.AuthorBookModule)
      }
    ]
  }
];
