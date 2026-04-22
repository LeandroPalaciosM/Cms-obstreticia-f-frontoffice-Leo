import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CmsService } from '../../core/services/cms.service';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-explore-all',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent, RouterLink, FormsModule],
  templateUrl: './explore-all.html',
  styleUrl: './explore-all.scss'
})
export class ExploreAllComponent {
  private cmsService = inject(CmsService);

  // Datos desde el servicio
  allArticles = toSignal(this.cmsService.getArticles(), { initialValue: [] });
  
  // Signals de estado para los filtros
  selectedCategory = signal('Todos');
  selectedDateFilter = signal('todas');
  searchQuery = signal(''); 

  // Lista de categorías (deben coincidir con lo que esperas de la API)
  categories = ['Todos', 'Investigación', 'Tecnología', 'Cultura', 'Eventos', 'Proyectos'];

  // Lógica unificada de filtrado
  displayArticles = computed(() => {
    let filtered = [...this.allArticles()]; 

    // 1. Filtro por Búsqueda (Título)
    const query = this.searchQuery().trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(query)
      );
    }

    // 2. Filtro por Categoría (Normalizado para evitar fallos por tildes/mayúsculas)
    const cat = this.selectedCategory();
    if (cat !== 'Todos') {
      filtered = filtered.filter(a => 
        a.category.toLowerCase() === cat.toLowerCase()
      );
    }

    // 3. Lógica de Ordenamiento
    const sort = this.selectedDateFilter();
    switch (sort) {
      case 'recientes':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'antiguas':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  });

  // Métodos de actualización
  setCategory(cat: string) { 
    this.selectedCategory.set(cat); 
  }
  
  setDateFilter(filter: string) { 
    this.selectedDateFilter.set(filter); 
  }
  
  updateSearch(query: string) { 
    this.searchQuery.set(query); 
  }
}