import axios from "axios";
import React, { useEffect } from "react";
import TacheForm from "./TacheForm";

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000/api/',
    headers: {
        'Authorization': 'Bearer 1|galJrGDjg1tI7yDHL0Gswz2kBVSKH9LUXFoDp2PU232e3dc0'
    }
});

export default function TacheList() {

    const [taches, setTaches] = React.useState([]);
    const [paginationData, setPaginationData] = React.useState(null);
    const [hasMore, setHasMore] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const addTache = (tache) => {
        setTaches([...taches, tache]);
    }


    useEffect(() => {
        setLoading(true);
        axiosInstance.get('http://localhost:8000/api/taches')
            .then((response) => {
                setPaginationData(response.data.data);
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                console.log('Requête effectuée');
                setLoading(false);
            });
    }, []);

    const loadMore = () => {
        setLoading(true);
        axiosInstance.get(paginationData.next_page_url).then((response) => {
            setPaginationData(response.data.data);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if (paginationData) {
            setTaches(taches => [...taches, ...paginationData.data]);
            setHasMore(paginationData.next_page_url !== null);
        } else {
            setTaches([]);
            setHasMore(false);
        }
    }, [paginationData]);

    const removeTask = (tache) => {
        axiosInstance.delete(`http://localhost:8000/api/taches/${tache.uid}`)
        .then(() => {
            setTaches(taches.filter((t) => t.id !== tache.id));
        }).catch((error) => {
            console.error(error);
        });
    }

    const markTaskAsDone = (tache) => {
        axiosInstance.put(`http://localhost:8000/api/taches/${tache.uid}/done`).then((response) => {
            setTaches(taches.map((t) => {
                if (t.id === tache.id) {
                    return response.data.data;
                }
                return t;
            }));
        }).catch((error) => {
            console.error(error);
        });
    }



    return (
        <div>
            <TacheForm handleAddTache={addTache}  />
            <h1>Liste des tâches </h1>
            <ul>
                {taches.map((tache) => {
                    return <li key={tache.id}>{tache.nom} 
                    {tache.terminee && <button onClick={()=>removeTask(tache)}>x</button>} &nbsp; 
                    {!tache.terminee && <button onClick={()=>markTaskAsDone(tache)}>Terminer</button>}
                    </li>
                })}
            </ul>
            {loading ? <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div> : null}
            <button className="btn btn-primary" onClick={loadMore} disabled={!hasMore || loading}>Charger plus</button>
        </div>
    );
}