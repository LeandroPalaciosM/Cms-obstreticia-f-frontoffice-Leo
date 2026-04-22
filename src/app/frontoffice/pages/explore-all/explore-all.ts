import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop'; // <--- IMPORTANTE
import { CmsService } from '../../core/services/cms.service';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-explore-all',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './explore-all.html',
  styleUrl: './explore-all.scss'
})
export class ExploreAllComponent {
  private cmsService = inject(CmsService);

  // 1. Convertimos el Observable a Signal directamente
  // Ponemos [] como valor inicial para que no sea undefined al empezar
  allArticles = toSignal(this.cmsService.getArticles(), { initialValue: [] });
  
  selectedCategory = signal('Todos');
  categories = ['Todos', 'Investigación', 'Tecnología', 'Cultura', 'Eventos', 'Proyectos'];

  displayArticles = computed(() => {
    // 2. Ahora allArticles() devuelve el Array, no el Observable
    const articles = this.allArticles();
    
    if (this.selectedCategory() === 'Todos') {
      return articles;
    }
    
    return articles.filter(a => a.category === this.selectedCategory());
  });

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }
}