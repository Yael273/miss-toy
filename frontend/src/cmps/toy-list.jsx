import { ToyPreview } from "./toy-preview"


export function ToyList({ toys, onEditToy, onRemoveToy }) {

    return <section className="toy-list">
        <ul>
            {toys.map(toy =>
                <li className="toy-preview-list" key={toy._id}>
                    <ToyPreview 
                    toy={toy} 
                    onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}
                    />


                </li>)}
        </ul>
    </section>
}