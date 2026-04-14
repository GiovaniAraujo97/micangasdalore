import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pulseirinhas-app';
  isMenuOpen = false;
  showScrollTop = false;
  @ViewChild('header', { static: true }) headerRef!: ElementRef<HTMLElement>;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    if (!this.isMenuOpen || !this.headerRef) {
      return;
    }

    const target = event.target as Node | null;
    if (target && target instanceof Element) {
      const isFormField = target.closest(
        'input, textarea, select, [contenteditable="true"]'
      );
      if (isFormField) {
        return;
      }
    }

    if (target && !this.headerRef.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollTop = window.scrollY > 220;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
