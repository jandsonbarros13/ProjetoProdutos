import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  acesso: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.acesso = this.authService.getUserAccess();
  }
}
