import React from "react";
import { axiosInstance } from "./TacheList";

export default function TacheForm({handleAddTache}) {

    const [loading, setLoading] = React.useState(false);

    const [tache, setTache] = React.useState({
        nom: '',
        description: ''
    });

    const handleChange = (e) => {
        setTache({
            ...tache,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tache);
        setLoading(true);
        axiosInstance.post('http://localhost:8000/api/taches', tache)
            .then((response) => {
                console.log(response.data);
                handleAddTache(response.data.data);
                // Reset form
                setTache({
                    nom: '',
                    description: ''
                });
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom</label>
                <input type="text" className="form-control" id="nom" name="nom" value={tache.nom} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" value={tache.description} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Ajouter 
            {loading ? <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div> : null}
            </button>
        </form>
    );

}