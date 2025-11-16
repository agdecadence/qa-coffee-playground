import { GlossaryTerm, ApiResponse } from '../models/types';
import { glossaryTerms } from '../data/glossary';

export class GlossaryService {
  /**
   * Get all glossary terms
   */
  getAllTerms(): ApiResponse<GlossaryTerm[]> {
    return {
      success: true,
      data: glossaryTerms.sort((a, b) => a.term.localeCompare(b.term)),
    };
  }

  /**
   * Get term by ID
   */
  getTermById(id: string): ApiResponse<GlossaryTerm> {
    const term = glossaryTerms.find((t) => t.id === id);
    
    if (!term) {
      return {
        success: false,
        error: `Term with ID ${id} not found`,
      };
    }

    return {
      success: true,
      data: term,
    };
  }

  /**
   * Get terms by category
   */
  getTermsByCategory(category: string): ApiResponse<GlossaryTerm[]> {
    const filtered = glossaryTerms.filter((t) => t.category === category);
    
    return {
      success: true,
      data: filtered.sort((a, b) => a.term.localeCompare(b.term)),
    };
  }

  /**
   * Search terms
   */
  searchTerms(query: string): ApiResponse<GlossaryTerm[]> {
    const lowerQuery = query.toLowerCase();
    
    const filtered = glossaryTerms.filter((term) => {
      const termMatch = term.term.toLowerCase().includes(lowerQuery);
      const definitionMatch = term.definition.toLowerCase().includes(lowerQuery);
      
      return termMatch || definitionMatch;
    });

    return {
      success: true,
      data: filtered.sort((a, b) => a.term.localeCompare(b.term)),
      message: `Found ${filtered.length} term(s)`,
    };
  }

  /**
   * Get related terms
   */
  getRelatedTerms(termId: string): ApiResponse<GlossaryTerm[]> {
    const term = glossaryTerms.find((t) => t.id === termId);
    
    if (!term) {
      return {
        success: false,
        error: `Term with ID ${termId} not found`,
      };
    }

    if (!term.relatedTerms || term.relatedTerms.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No related terms found',
      };
    }

    const related = glossaryTerms.filter((t) => term.relatedTerms?.includes(t.id));

    return {
      success: true,
      data: related,
    };
  }
}
