package main

// r_wiki
// r_aki
// r_holo
// r_isa
// r_agent
// r_meaning
// r_hypo
// r_sentiment
// r_patient
// r_coocurrence
// r_instr
// r_bigger_than
// useless
func getRelsFromType(w Word, typeRel string) (list []Rel) {
	for _, r := range w.ListRel {
		if r.Type == typeRel {
			list = append(list, r)
		}
	}
	return list
}
