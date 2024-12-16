<script>
    let name = $state();
    let description = $state();
    let startingPrice = $state();
    let category = $state();
    let image = $state();
    let endingDate = $state();

    let message = $state();

    const newListingHandler = async (event) => {
        event.preventDefault();
        await newListing(name, description, startingPrice, category, image, endingDate);
    };

    const newListing = async (name, description, startingPrice, category, image, endingDate) => {
        const listing = {
            name,
            description,
            startingPrice,
            category,
            image,
            endingDate
        };
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(listing)
            });

            message = await response.json();


        } catch (error) {
            console.error('Error during new listing:', error);
        }
    }

</script>


<form onsubmit={newListingHandler} class="flex flex-col gap-5">
    <div class="grid grid-cols-2 gap-10">
        <div class="flex flex-col">
            <label for="name">Naam product veiling:</label>
            <input id="name" type="text" bind:value={name}
                   minlength="3"
                   maxlength="40"
                   placeholder="eg. iPhone 13 Pro Max"
                   class="py-2 px-2 rounded-xl border border-1 outline-none"
            />
        </div>

        <div class="flex flex-col">
            <label for="startingPrice">Starting Price:</label>
            <input id="startingPrice" type="number" bind:value={startingPrice}
                   min="1"
                   placeholder="eg. 100"
                   class="py-2 px-2 rounded-xl border border-1 outline-none"
            />
        </div>
    </div>
    <div class="flex flex-col">
        <label for="description">Description:</label>
        <textarea id="description" class="border border-1 rounded-xl outline-none p-2" bind:value={description}></textarea>
    </div>

    <div class="grid grid-cols-2 gap-10">

        <div class="flex flex-col">
            <label for="category">Category:</label>
            <input id="category" type="text" bind:value={category}
                   minlength="3"
                   maxlength="30"
                   placeholder="eg. Electronics"
                   class="py-2 px-2 rounded-xl border border-1 outline-none"
            />
        </div>

        <div class="flex flex-col">
            <label for="endingDate">Ending Date:</label>
            <input id="endingDate" type="datetime-local" bind:value={endingDate}
                   class="py-2 px-2 rounded-xl border border-1 outline-none"
            />
        </div>
    </div>

    <div class="flex flex-col">
        <label for="image">Image URL:</label>
        <input id="image" type="url" bind:value={image}
               placeholder="eg. https://example.com/image.jpg"
               class="py-2 px-2 rounded-xl border border-1 outline-none"
        />
    </div>
    <button type="submit"
            class="max-w-[200px] my-4 flex font-medium text-green-700 text-xl bg-gradient-to-b from-green-400 to-green-200 px-10 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
        Plaats veiling
    </button>
</form>
<p class="text-red-700">{message}</p>


<div class="">
    <img src={image} alt="Image preview">
</div>