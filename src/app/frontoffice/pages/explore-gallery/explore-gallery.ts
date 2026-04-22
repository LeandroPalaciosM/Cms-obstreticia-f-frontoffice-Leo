import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explore-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './explore-gallery.html',
  styleUrl: './explore-gallery.scss'
})
export class ExploreGalleryComponent {
  
  allCategories = signal([
    { 
      id: 1, 
      name: 'Ciencias de la Vida', 
      icon: '🧬', 
      gradient: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)' 
    },
    { 
      id: 2, 
      name: 'Medio Ambiente', 
      icon: '🌱', 
      gradient: 'linear-gradient(135deg, #edb5b5 0%, #e88e8e 100%)' 
    },
    { 
      id: 3, 
      name: 'Datos y Estadística', 
      icon: '📊', 
      gradient: 'linear-gradient(135deg, #90bede 0%, #6392b9 100%)' 
    },
    { 
      id: 4, 
      name: 'Tecnología e Innovación', 
      icon: '🚀', 
      gradient: 'linear-gradient(135deg, #ffd89b 0%, #19033e 100%)' 
    },
    { 
      id: 5, 
      name: 'Historia y Cultura', 
      icon: '🏛️', 
      gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfd9 100%)' 
    },
    { 
      id: 6, 
      name: 'Investigación Médica', 
      icon: '🔬', 
      gradient: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)' 
    }
  ]);
}